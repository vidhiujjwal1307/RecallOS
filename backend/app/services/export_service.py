import json
import csv
from io import StringIO

from sqlalchemy.orm import Session

from app.models.memory import Memory


def export_json(db: Session):

    memories = db.query(Memory).all()

    data = []

    for m in memories:

        data.append({

            "id": m.id,
            "title": m.title,
            "content": m.content,
            "url": m.url,
            "category": m.category,
            "timestamp": m.timestamp

        })

    return json.dumps(data, indent=4)


def export_csv(db: Session):

    memories = db.query(Memory).all()

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow(
        [
            "ID",
            "Title",
            "Content",
            "URL",
            "Category",
            "Timestamp"
        ]
    )

    for m in memories:

        writer.writerow([
            m.id,
            m.title,
            m.content,
            m.url,
            m.category,
            m.timestamp
        ])

    return output.getvalue()