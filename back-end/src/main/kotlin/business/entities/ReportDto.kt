package business.entities

import java.time.LocalDateTime

/**
 * ReportDto is used to contains the attributes of a report. It does not make any process. Except
 * maybe some check.
 */
interface ReportDto {

    val id: String

    val date: String

    val email: String

    val comment: String

    val emailAdmin: String

    val severity: Int

    val type: Int

    val state: Int

}
