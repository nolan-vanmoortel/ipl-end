package persistence.dao

import business.entities.UserDto
import business.entities.UserReal

/**
 * UserDao will make the logic about the Users Table.
 */
interface UserDao {

    /**
     * @param id of the user inside the db.
     * @return an user if the id represent an user and null otherwise.
     */
    fun getUserById(id: String): UserReal
    fun getUserByEMail(email: String): UserReal
    fun save(user: UserDto): UserReal
    fun getAllUsers(): ArrayList<UserDto>
}
