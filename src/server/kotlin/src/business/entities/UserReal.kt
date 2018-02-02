package business.entities

import business.entities.UserDto


/**
 * UserReal contains the methods that may be applied to an User. It allows an User
 * to have a process.
 */
interface UserReal: UserDto {

    fun complexMethod()
}