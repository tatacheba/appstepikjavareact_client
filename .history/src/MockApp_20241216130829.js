import "./App.css";
import TablewView from "./layouts/components/tableView/TablewView";
import { useEffect, useState } from "react";
import FormNewItem from "./layouts/formNewItem/FormNewItem";
import ModalDeleteContact from "./layouts/components/ModalDeleteContact";
import { mockApi } from "./layouts/mocks/mockApi";

function MockApp() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContactId, setCurrentContactId] = useState(null);

    useEffect(() => {
        console.log("Fetching contacts...");
        mockApi
            .getContacts()
            .then((data) => {
                setItems(data);
                console.log("Contacts loaded:", data);
            })
            .catch((error) => console.error("Error fetching contacts:", error));
    }, []);

    const onToggleModal = (id = null) => {
        setIsModalOpen((prev) => !prev);
        setCurrentContactId(id);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>App</h1>
                </div>
                <div className="card-body">
                    <TablewView
                        data={items}
                        removeContact={onToggleModal} // Передаём функцию открытия модального окна
                    />
                    <FormNewItem
                        appContact={appendContact}
                        disabled={loading}
                    />
                </div>
            </div>
            <ModalDeleteContact
                isOpen={isModalOpen}
                onModal={removeContact} // Удаляем контакт
                onCancel={() => onToggleModal(false)} // Закрыть модальное окно
            />
        </div>
    );
}

export default MockApp;
