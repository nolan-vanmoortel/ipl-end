package tests.mocks

import business.entities.UserReal
import tests.util.SetValidator


class UserMock() : UserReal, SetValidator() {

    override val id: String
        get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.
    override val email: String
        get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.
    override val salt: String
        get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.
    override val password: String
        get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.

    override fun complexMethod() {
        addCurrentMethodToSet()
    }

}
