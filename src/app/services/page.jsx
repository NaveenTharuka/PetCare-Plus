export default async function Services() {

    const res = await fetch("https://json-placeholder.mock.beeceptor.com/users");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h1>Services Page</h1>
            </div>

            <div>
                {data.map(user => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>

        </>
    )
}