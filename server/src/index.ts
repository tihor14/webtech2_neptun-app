import express from "express";
import { getRouter } from "./routes";
import { Instructor } from "./entity/Instructor";
import { User } from "./entity/User";
import { handleAuthorizationError } from "./protect-routes";

async function main() {
  // connectToMongoDB();

  const app = express();

  app.use(express.json());
  
  const cors = require('cors');
  const corsOptions = {
      origin: 'http://localhost:4200',
      credentials: true,            //access-control-allow-credentials:true
      optionSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  
  //app.use('/api', getRouter());
  app.use('/api', getRouter(), handleAuthorizationError);
  
  // var MongoClient = require('mongodb').MongoClient;
  //   var url = "mongodb+srv://admin:admin@neptundb.gnlersp.mongodb.net/?retryWrites=true&w=majority&appName=neptundb";
  //   const client = new MongoClient(url);
  //   MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("neptundb");
  //   dbo.createCollection("ASD", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  //   });
  //   });
  //   console.log("Itt vagyok");
  // const url = "mongodb+srv://admin:admin@neptundb.gnlersp.mongodb.net/?retryWrites=true&w=majority&appName=neptundb";
  // var MongoClient = require('mongodb').MongoClient;
  // const client = new MongoClient(url);

  // try {
  //   // Connect to the MongoDB server
  //   await client.connect();
  //   console.log("Connected to MongoDB!");

  //   const dbo = client.db("neptundb");

  //   // Data to be inserted
  //   const myobj = [
  //     { id: 1, name: 'Nagy Béla', department: 'Matematika és Fizika tanszék', email: 'nagy.bela@example.com', subjectTaught: 'Matematika' },
  //     { id: 2, name: 'Kis Géza', department: 'Informatika tanszék', email: 'kis.geza@example.com', subjectTaught: 'Informatika' },
  //     { id: 3, name: 'Kovács Péter', department: 'Informatika tanszék', email: 'kovacs.peter@example.com', subjectTaught: 'Informatika' },
  //     { id: 4, name: 'Szabó Anna', department: 'Nyelvek tanszék', email: 'szabo.anna@example.com', subjectTaught: 'Angol' },
  //     { id: 5, name: 'Varga Éva', department: 'Történelem tanszék', email: 'varga.eva@example.com', subjectTaught: 'Történelem' },
  //     { id: 6, name: 'Molnár János', department: 'Kémia tanszék', email: 'molnar.janos@example.com', subjectTaught: 'Kémia' },
  //     { id: 7, name: 'Németh Judit', department: 'Biológia tanszék', email: 'nemeth.judit@example.com', subjectTaught: 'Biológia' },
  //     { id: 8, name: 'Horváth Tamás', department: 'Irodalom tanszék', email: 'horvath.tamas@example.com', subjectTaught: 'Irodalom' }
  //   ];

  //   // Insert data into the collection
  //   const result = await dbo.collection("instructor").insertMany(myobj);
  //   console.log("Number of documents inserted: " + result.insertedCount);

  // } catch (err) {
  //   console.error(`DB Connection Error: ${err.message}`);
  // } finally {
  //   // Close the connection
  //   await client.close();
  //   console.log("Connection closed!");
  // }

  const url = "mongodb+srv://admin:admin@neptundb.gnlersp.mongodb.net/?retryWrites=true&w=majority&appName=neptundb";
  var MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(url);
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected to MongoDB!");
  app.listen(3000, () => {
      console.log('Listening on :3000 ...');
  });
   
}


main();


// AppDataSource.initialize().then(async () => {
    
//     // const user = new User();
//     // user.firstName = "Teszt";
//     // user.lastName = "Elek";
//     // user.email = "asd@adcs";
//     // user.password = "123";
//     // await AppDataSource.manager.save(user);
//     // console.log("User saved");
//     // AppDataSource.destroy();

//     try {
//       // Példány létrehozása és feltöltése adatokkal
//       const instructor = new Instructor();
//       instructor.name = "Kovács János";
//       instructor.email = "kovacs.janos@gmail.com";
//       instructor.department = "Magyar Nyelv és Irodalom tanszék";

//       const subject1 = new Subject();
//       subject1.name = "Magyar Nyelv";
//       subject1.instructor = instructor;

//       const subject2 = new Subject();
//       subject2.name = "Irodalom";
//       subject2.instructor = instructor;
//       instructor.subjectTaught = [subject1, subject2];

//       const course1 = new Course();
//       course1.name = "Magyar Nyelv I.";
//       course1.subject = subject1;

//       const course2 = new Course();
//       course2.name = "Irodalom I.";
//       course2.subject = subject2;

//       const student = new Student();
//       student.name = "Kis Péter";
//       student.group = "A";

//       const grade1 = new Grade();
//       grade1.grade = 4; // Példa érdemjegy
//       grade1.course = course1;
//       grade1.student = student;

//       // Példányok mentése az adatbázisba
//       await AppDataSource.manager.save(instructor);
//       await AppDataSource.manager.save(subject1);
//       await AppDataSource.manager.save(subject2);
//       await AppDataSource.manager.save(course1);
//       await AppDataSource.manager.save(course2);
//       await AppDataSource.manager.save(student);
//       await AppDataSource.manager.save(grade1);

//       console.log("Adatok sikeresen mentve az adatbázisba.");

//       // Adatforrás lezárása
//       AppDataSource.destroy();
//   } catch (error) {
//       console.error("Hiba történt az adatok mentése közben:", error);
//       AppDataSource.destroy();
//   }

// }).catch(error => {
//     console.log(error);
//     AppDataSource.destroy();
// });