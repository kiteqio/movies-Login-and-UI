// import clientPromise from "../../lib/mongodb"

// export default async (req, res) => {
//     try {
//         const client = await clientPromise
//         const db = client.db("sample_mflix");


//         const movies = await db
//           .collection("movies")
//           .find({})
//           .sort({ metacritic: -1 })
//           .limit(10)
//           .toArray();

//         res.json(movies);
//     }  catch (e) {
//         console.error(e)
//     }
// }

// import clientPromise from "../../lib/mongodb";

// export default async (req, res) => {
//   const client = await clientPromise;
//   const db = client.db("kieqiodbname");

//   if (req.method === "GET") {
//     try {
//       const movies = await db
//         .collection("kiteqiocollectnme")
//         .find({})
//         .sort({ metacritic: -1 })
//         .limit(10)
//         .toArray();

//       res.json(movies);
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       // Insert static data
//       const staticMovies = [
//         { title: "Movie 1", metacritic: 90 },
//         { title: "Movie 2", metacritic: 85 },
//         // Add more static movies as needed
//       ];

//       await db.collection("kiteqiocollectnme").insertMany(staticMovies);

//       res.status(201).json({ message: "Static data inserted successfully" });
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// };


// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("kieqiodbname");

  if (req.method === "GET") {
    try {
      const movies = await db
        .collection("kiteqiocollectnme")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();

      res.json(movies);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      // Extract data from the request body
      const { email, id } = req.body;

      // Validate the data if needed

      // Insert the received data into the database
      const result = await db.collection("kiteqiocollectnme").insertOne({
        email,
        id,
      });

      res.status(201).json({
        message: "Data inserted successfully",
        insertedId: result.insertedId,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
