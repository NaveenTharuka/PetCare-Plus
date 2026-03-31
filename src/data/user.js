export const userData = {
    user: [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password",
            role: "user",
            photo: "https://picsum.photos/500/500",
            phone: "1234567890",
            address: "123 Main St,Anytown, USA",
        }
    ]
}

export const getUser = () => {
    return userData.user[0];

}