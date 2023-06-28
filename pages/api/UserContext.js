import { createContext, useState } from 'react';

// Создаем контекст пользователя
export const UserContext = createContext();

async function fetchUserFromDatabase() {
    try {
        const response = await axios.get('/getUser'); // Запрос к вашему API для получения данных пользователя
        const user = response.data; // Предполагается, что в ответе API будет объект с данными пользователя
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Обертка для предоставления значения контекста
export const UserProvider = ({ children }) => {
    fetchUserFromDatabase();
    // Здесь вы можете определить состояние пользователя
    const [user, setUser] = useState({
        username: '',
        role: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
