import { useEffect } from "react";


export default function useNotifications(userId, setNotifications) {

    useEffect(() => {

        const socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL}/notification/${userId}`
        );


        socket.onmessage = (event) => {

            const notification = JSON.parse(
                event.data
            );


            setNotifications(prev => [
                notification,
                ...prev
            ]);

        };


        return () => {
            socket.close();
        }

    }, [userId])

}