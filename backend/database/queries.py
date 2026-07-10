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


def get_dashboard_statistics():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            COUNT(*) AS total_predictions,
            SUM(prediction='Normal') AS total_normal,
            SUM(prediction='Attack') AS total_attacks
        FROM prediction_history
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    """)

    result = cursor.fetchone()

    total = result["total_predictions"] or 0
    attack = result["total_attacks"] or 0

    if total == 0:
        attack_rate = 0
        risk_score = 0
    else:
        attack_rate = attack / total * 100

        risk_score = min(100, round(attack_rate * 2))

    result["risk_score"] = risk_score
    result["attack_rate"] = round(attack_rate, 2)

    cursor.close()
    conn.close()

    return result

    
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

def get_model_info():

    return {
        "model_name": "RandomForest_v1",
        "algorithm": "Random Forest",
        "accuracy": 0.874598,
        "dataset": "UNSW-NB15"
    }

def get_attack_trend():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            HOUR(created_at) AS hour,
            COUNT(*) AS count
        FROM prediction_history
        WHERE prediction = 'Attack'
          AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY HOUR(created_at)
    """)

    db_rows = cursor.fetchall()

    cursor.close()
    conn.close()

    attack_map = {
        row["hour"]: row["count"]
        for row in db_rows
    }

    trend = []

    for hour in range(24):
        trend.append({
            "hour": f"{hour:02d}:00",
            "count": attack_map.get(hour, 0)
        })

    return trend

def get_recent_attacks(limit=6):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM prediction_history
        WHERE prediction='Attack'
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

    cursor.execute("""
        SELECT
            predicted_attack,
            COUNT(*) AS count
        FROM prediction_history
        WHERE prediction='Attack'
            AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY predicted_attack
        ORDER BY count DESC;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows

def get_logs(limit=1000):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM prediction_history
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY created_at DESC
        LIMIT %s
    """, (limit,))

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows