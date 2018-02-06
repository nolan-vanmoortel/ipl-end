package business.entities

import java.time.LocalDateTime

public const val MINOR_SEVERITY = 0
public const val MAJOR_SEVERITY = 1

public const val DEFAULT_TYPE = 0
public const val SOFTWARE_TYPE = 1
public const val HARDWARE_TYPE = 2

/**
 * ReportDto is used to contains the attributes of a report. It does not make any process. Except
 * maybe some check.
 */
interface ReportDto {

    val id: String

    val date: LocalDateTime

    val email: String

    val comment: String

    val emailAdmin: String

    val severity: Int

    val type: Int

    val state: String

}
