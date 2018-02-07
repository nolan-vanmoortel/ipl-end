package persistence.dao

import business.entities.ReportDto
import business.entities.ReportReal
import java.time.LocalDateTime

/**
 * ReportDao will make the logic about the Reports Table.
 */
interface ReportDao {

    /**
     * @param id of the report inside the db.
     * @return a report if the id represent a report and null otherwise.
     */
    fun getReportById(id: String): ReportReal
    fun getReportByDate(date: String): ReportReal
    fun save(name: String, report: ReportDto)
    fun updateState(name: String, report: ReportDto, state: Int)
}
