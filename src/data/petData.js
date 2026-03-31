const pets = {
    "pets": [
        {
            "id": 1,
            "name": "Buddy",
            "species": "Dog",
            "breed": "Golden Retriever",
            "age": 3,
            "gender": "Male",
            "photo": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
            "nextVaccine": "Oct 15, 2024",
            "medicalHistory": [
                {
                    "date": "2023-01-15",
                    "diagnosis": "Routine Checkup",
                    "treatment": "Vaccinations",
                    "vetId": 201
                }
            ]
        },
        {
            "id": 2,
            "name": "Whiskers",
            "species": "Cat",
            "breed": "Siamese",
            "age": 5,
            "gender": "Female",
            "photo": "https://images.unsplash.com/photo-1519052399878-0569988038c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww",
            "nextVaccine": "Oct 20, 2026",
            "medicalHistory": []
        }
    ]
}

export function getPets() {
    return pets.pets;
}