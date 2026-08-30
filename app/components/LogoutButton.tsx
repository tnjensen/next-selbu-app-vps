"use client"

export default function LogoutButton() {
    return (
        <form action="/api/auth/logout" method="post">
            <button type="submit" className="cursor-pointer underline">
                Logg ut
            </button>
        </form>
    );
}