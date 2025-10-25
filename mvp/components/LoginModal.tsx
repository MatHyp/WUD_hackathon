import React, { useState } from "react";
import Modal from "./Modal";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

interface LoginData {
    email: string;
    password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onSwitchToRegister,
}) => {
    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password");
            return;
        }

        console.log("Logged in:", formData);
        alert(`Welcome back!`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Login">
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    name="email"
                    value={formData.email}
                    placeholder="email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {error && <p className="error">{error}</p>}
                <div>

                    <button type="submit" className="submit-btn">Login</button>
                </div>

                <p className="switch-text">
                    Don’t have an account?{" "}
                    <button type="button" onClick={onSwitchToRegister} className="link-btn">
                        Register
                    </button>
                </p>
            </form>
        </Modal>
    );
};

export default LoginModal;
