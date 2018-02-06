package controllers

import business.entities.MachineDto
import persistence.dao.MachineDao
import spark.Spark.path
import spark.kotlin.post
import util.Message
import business.factory.MachineFactory
import com.fasterxml.jackson.databind.ObjectMapper
import spark.Request
import util.*
import java.nio.file.StandardCopyOption
import java.nio.file.Files
import javax.servlet.MultipartConfigElement
import spark.Spark.staticFiles
import jdk.nashorn.internal.runtime.ScriptingFunctions.readLine
import java.io.*
import java.util.ArrayList
import java.util.stream.Stream


private var COMMA_DELIMITER = ","


fun MachineController(machineDao: MachineDao, machineFactory: MachineFactory){
    path("/machines"){
        post("/import") {
            /*println("Request received!")
            val uploadDir = File("upload")
            uploadDir.mkdirs()
            staticFiles.externalLocation("upload")
            println("TEST OK")

            val tempFile = Files.createTempFile(uploadDir.toPath(), "", "")

            request.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))

            request.raw().getPart("file").getInputStream().use({ input ->
                Files.copy(input, tempFile, StandardCopyOption.REPLACE_EXISTING)
            })

            val filename: String = "upload/" + tempFile.fileName.toString()
            val br: BufferedReader = File(filename).bufferedReader()

            try {
                //Reading the csv file
                val machinesList = ArrayList<MachineDto>()

                var line = ""
                //Read to skip the header
                line = br.readLine().toString()
                //Reading from the second line
                while (line != null) {
                    val machineDetails = line.split(COMMA_DELIMITER.toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()

                    if (machineDetails.isNotEmpty()) {
                        val machine = machineFactory.getMachine()
                        machinesList.add(machine)
                    }
                    line = br.readLine()
                }


            } catch (ee: Exception) {
                ee.printStackTrace()
            } finally {
                try {
                    br.close()
                } catch (ie: IOException) {
                    println("Error occured while closing the BufferedReader")
                    ie.printStackTrace()
                }

            }*/
            try {
                request.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))
                request.raw().getPart("file").inputStream.bufferedReader().use {
                    println(it.readText())
                }
            }catch (e:Exception){
                println(e.message)
            }


        }
    }

}
