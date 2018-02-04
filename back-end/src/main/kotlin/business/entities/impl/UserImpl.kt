package business.entities.impl

import business.entities.UserReal

/**
 * Implementation of UserDto and UserReal.
 */
data class UserImpl(override val id: String = "",
                    override val name: String = "",
                    override val firstname: String = "",
                    override val email: String = "",
                    override val salt: String = "",
                    override val password: String = "") : UserReal {

    /**
     * Hello i'm a very complex method.
     */
    override fun complexMethod() {
            println("Je suis la méthode complexe de $firstname $name")
    }
}
