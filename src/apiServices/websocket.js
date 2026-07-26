class NotificationSocket {
    socket = null;

    connect(userId, onMessage) {
        if (this.socket) return;

        this.socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL}/ws/notifications/${userId}`
        );

        this.socket.onopen = () => {
            console.log("Notification Socket connected");
        };

        this.socket.onmessage = (event) => {
            const notification = JSON.parse(event.data)

            onMessage(notification);
        };

        this.socket.oneerror = (err) => {
            console.error(err)
        }

        this.socket.onClose = () => {
            console.log("Socket disconnected")
            this.socket = null;
        }

    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default new NotificationSocket();