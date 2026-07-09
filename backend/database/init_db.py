from backend.database.connection import get_connection

conn = get_connection()
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS prediction_history(
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    source_file VARCHAR(100),

    predicted_attack VARCHAR(30),

    prediction ENUM('Normal','Attack'),

    confidence FLOAT,

    model_version VARCHAR(20)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS notification_log(
    id INT AUTO_INCREMENT PRIMARY KEY,

    prediction_id INT,

    predicted_attack VARCHAR(30),

    confidence FLOAT,

    status ENUM('SUCCESS','FAILED'),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prediction
        FOREIGN KEY(prediction_id)
        REFERENCES prediction_history(id)
        ON DELETE CASCADE
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS model_info(
    id INT AUTO_INCREMENT PRIMARY KEY,

    model_name VARCHAR(50),

    algorithm VARCHAR(50),

    accuracy FLOAT,

    dataset_size INT,

    trained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()

print("Database Initialized!")

cursor.close()
conn.close()
