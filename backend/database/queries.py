from backend.database.connection import get_connection


def insert_predictions(df):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO prediction_history
    (
        source_file,
        predicted_attack,
        prediction,
        confidence,
        model_version
    )
    VALUES (%s,%s,%s,%s,%s)
    """

    prediction_ids = []

    for _, row in df.iterrows():

        prediction = (
            "Normal"
            if row["predicted_attack"] == "Normal"
            else "Attack"
        )

        cursor.execute(
            sql,
            (
                "test.csv",
                row["predicted_attack"],
                prediction,
                float(row["confidence"]),
                "RandomForest_v1"
            )
        )

        prediction_ids.append(cursor.lastrowid)

    conn.commit()

    cursor.close()
    conn.close()

    print(f"{len(prediction_ids)} predictions inserted.")

    return prediction_ids


def insert_notifications(prediction_ids, df):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO notification_log
    (
        prediction_id,
        predicted_attack,
        confidence,
        status
    )
    VALUES (%s,%s,%s,%s)
    """

    rows = []

    for pid, (_, row) in zip(prediction_ids, df.iterrows()):

        if row["predicted_attack"] == "Normal":
            continue

        rows.append(
            (
                pid,
                row["predicted_attack"],
                float(row["confidence"]),
                "SUCCESS"
            )
        )

    if rows:

        cursor.executemany(sql, rows)

        conn.commit()

    cursor.close()
    conn.close()

    print(f"{len(rows)} notifications inserted.")


def get_recent_predictions(limit=20):

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM prediction_history
        ORDER BY created_at DESC
        LIMIT %s
        """,
        (limit,)
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows


def get_attack_statistics():

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            predicted_attack,
            COUNT(*) AS count
        FROM prediction_history
        GROUP BY predicted_attack
        ORDER BY count DESC
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows
def get_recent_notifications(limit=20):

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            predicted_attack,
            confidence,
            status,
            created_at
        FROM notification_log
        ORDER BY created_at DESC
        LIMIT %s
        """,
        (limit,)
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows


def get_dashboard_statistics():

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            COUNT(*) AS total_predictions,

            SUM(
                CASE
                    WHEN prediction='Attack'
                    THEN 1
                    ELSE 0
                END
            ) AS total_attacks,

            SUM(
                CASE
                    WHEN prediction='Normal'
                    THEN 1
                    ELSE 0
                END
            ) AS total_normal
        FROM prediction_history
        """
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    return row

def get_model_info():

    return {
        "model_name": "RandomForest_v1",
        "algorithm": "Random Forest",
        "accuracy": 0.874598,
        "dataset": "UNSW-NB15"
    }
