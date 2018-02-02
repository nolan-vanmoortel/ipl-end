package ucc

import business.entities.UserDto

/**
 * Contains the logic about the Users. Allows us to make operations on it.
 */
interface UserUcc {

    /**
     * Get an user by is id.
     * @param id the id representing the user.
     * @return UserDto the userDto associated to id.
     */
    fun getUserById(id: Int): UserDto
}