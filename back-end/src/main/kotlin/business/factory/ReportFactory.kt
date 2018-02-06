package business.factory

import business.entities.DEFAULT_TYPE
import business.entities.MINOR_SEVERITY
import business.entities.ReportDto
import org.bson.Document
import java.time.LocalDateTime

/**
 * ReportFactory is used to create new Reports.
 */
interface ReportFactory {

    /**
     * @return a new instance of Report as an ReportDto.
     * @params used to initiate the fields of the Report.
     */
    fun getReport(id:String = "", date:LocalDateTime = LocalDateTime.now(), email: String = "", comment: String = "", emailAdmin: String = "", state: String = "TODO", severity:Int = MINOR_SEVERITY, type: Int = DEFAULT_TYPE): ReportDto
    fun getReport(document : Document): ReportDto
}