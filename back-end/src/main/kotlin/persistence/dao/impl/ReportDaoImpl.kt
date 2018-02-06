package persistence.dao.impl

import business.entities.ReportDto
import business.entities.ReportReal
import business.factory.ReportFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.DalServices
import org.bson.Document
import org.bson.types.ObjectId
import persistence.MACHINES_COLLECTION
import persistence.dao.ReportDao
import java.time.LocalDateTime

/**
 * Implementation of ReportDao.
 */
class ReportDaoImpl(private val dal: DalServices,
                    private val reportFactory: ReportFactory): ReportDao {

    override fun save(idMachine: String, report: ReportDto): ReportReal {
        // Unclean
        val machine = dal.getCollection(MACHINES_COLLECTION).find(Document("_id", ObjectId(idMachine))).first()
        val reports = machine.get("reports", ArrayList<ReportDto>())
        reports.add(report)
        machine.replace("reports", reports)
        // Unclean
        dal.getCollection(MACHINES_COLLECTION).updateOne(Document("_id", ObjectId(idMachine)), Document.parse(ObjectMapper().writeValueAsString(machine)))
        return getReportByDate(report.date)
    }

    override fun getReportById(id: String): ReportReal {
        val report = dal.getCollection(MACHINES_COLLECTION).find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getReportById failed !")
        return reportFactory.getReport(report) as ReportReal
    }
    override fun getReportByDate(date: LocalDateTime): ReportReal {
        val report = dal.getCollection(MACHINES_COLLECTION).find(Document("date", date)).first()
                ?: throw NoFatalException("getReportByEMail failed !")
        return reportFactory.getReport(report) as ReportReal
    }
}
