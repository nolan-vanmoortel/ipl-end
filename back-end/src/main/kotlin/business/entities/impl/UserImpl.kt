package business.entities.impl

import business.entities.UserReal
import com.fasterxml.jackson.annotation.JsonIgnore

/**
 * Implementation of UserDto and UserReal.
 */
data class UserImpl(override val id: String = "",
                    override val email: String = "",
                    @JsonIgnore override val salt: String = "",
                    @JsonIgnore override val password: String = "") : UserReal {

    /**
     * Hello i'm a very complex method.
     */
    override fun complexMethod() {
            println("Je suis la méthode complexe de $email")
    }
}
