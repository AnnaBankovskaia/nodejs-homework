import { User, Users } from '../entities/users';
import { v4 as uuidv4 } from 'uuid';

interface IUserService {
    getUser(id: string): User | undefined
    getUsers(search?: string, limit?: string): User[]
    createUser(data: Partial<User>): User
    updateUser(data: Partial<User>): User
    deleteUser(id: string): void
}

const users: Users = {};

export class UserService implements IUserService {
    getUser(id: string): User | undefined {
        return users[id];
    }

    getUsers(search?: string, limit?: string): User[] {
        const filteredUsers = Object.values(users)
            .filter(user => {
                if (search && typeof search === 'string') {
                    return user.login.includes(search);
                }
                return true;
            })
            .sort((a, b) => a.login > b.login ? 1 : -1);

        if (limit && Number(limit) > 0) {
            return filteredUsers.slice(0, Number(limit));
        }

        return filteredUsers;
    }

    createUser(data: Partial<User>): User {
        const id = uuidv4();
        const newUser = {
            id,
            login: data.login,
            password: data.password,
            age: data.age,
            isDeleted: false
        };

        users[id] = newUser;
        return newUser;
    }

    updateUser(data: Partial<User>): User {
        users[data.id] = {
            ...users[data.id],
            login: data.login,
            password: data.password,
            age: data.age
        };
        return users[data.id];
    }

    deleteUser(id: string) {
        users[id] = {
            ...users[id],
            isDeleted: true
        };
    }
}
