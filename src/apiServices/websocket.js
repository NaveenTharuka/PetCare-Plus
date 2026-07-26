class NotificationSocket {
    socket = null;

    connect(userId, onMessage) {

        if (
            this.socket &&
            (
                this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING
            )
        ) {
            console.log("Socket already connected");
            return;
        }


        this.socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL}/ws/notifications/${userId}`
        );


        this.socket.onopen = () => {
            console.log("Notification Socket connected");
        };


        this.socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            onMessage(notification);
        };


        this.socket.onerror = (err) => {
            console.error("Notification socket error", err);
        };


        this.socket.onclose = () => {
            console.log("Socket disconnected");
            this.socket = null;
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default new NotificationSocket();