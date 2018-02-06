package business.entities.impl

import business.entities.DEFAULT_TYPE
import business.entities.MINOR_SEVERITY
import business.entities.ReportReal
import java.time.LocalDateTime

/**
 * Implementation of ReportDto and ReportReal.
 */

data class ReportImpl(override val id: String = "",
                      override val date: LocalDateTime = LocalDateTime.now(),
                      override val email: String = "",
                      override val emailAdmin: String = "",
                      override val comment: String = "",
                      override val state: String = "TODO",
                      override val severity: Int = MINOR_SEVERITY,
                      override val type: Int = DEFAULT_TYPE) : ReportReal {

    /**
     * Hello i'm a very complex method.
     */
    override fun complexMethod() {
            println("Je suis la méthode complexe de $email $state")
    }
}
