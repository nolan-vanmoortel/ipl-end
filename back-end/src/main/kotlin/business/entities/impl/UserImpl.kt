package business.entities.impl

import business.entities.UserReal

/**
 * Implementation of UserDto and UserReal.
 */
data class UserImpl(override val name: String = "",
                           override val firstName: String = "") : UserReal {

    /**
     * Hello i'm a very complex method.
     */
    override fun complexMethod() {
            println("Je suis la méthode complexe de $firstName $name")
    }

}
