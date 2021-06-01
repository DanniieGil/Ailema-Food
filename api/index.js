const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/utils/middlewares/errorHandlers");
const setHeaders = require("./src/utils/middlewares/setHandlers");
const { conn } = require("./src/models/db");
const { portServer } = require("./src/utils/config/");
const server = express();
const { Recipe, Diet } = require("../api/src/models/db");

// ! MIDDLEWARE CORS
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);

// ! SETTINGS ROUTES
server.use("/", routes);

// ! MIDDLEWARE CONTROL-ERRORS
server.use(errorHandler);

conn.sync({ force: true }).then(() => {
  server.listen(portServer, () => {
    
         // * PRELOAD DIETS
         ( async () => {
          const PreloadDiets = [
            { name: "gluten free", id: "1", image: "https://i0.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/11/sin_gluten2.png" },
            { name: "dairy free",  id: "2", image: "https://www.bellezapura.com/wp-content/uploads/2010/03/p.lacteos.jpg"},
            { name: "lacto ovo vegetarian", id: "3", image: "https://i.pinimg.com/originals/7a/16/04/7a1604bde022682bc4e5fb63f9631dbf.jpg"},
            { name: "vegan", id: "4", image: "https://www.news-medical.net/image.axd?picture=2021%2F3%2Fshutterstock_1652895442.jpg"},
            { name: "primal", id: "5", image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/salmon-salad-1296x728-header.jpg"},
            { name: "paleolithic", id: "6", image: "https://santacruzcore.com/wp-content/uploads/paleo-chicken-carrot-cabage-fish-1.jpg"},
            { name: "pescatarian",  id: "7", image: "https://cdn.prod.openfit.com/uploads/2019/09/09154549/pescatarian-diet-header-1200x600.jpg"},
          ]
        
          const dietas = await PreloadDiets.map(el=>{
              return  Diet.create(el)
          })
      
        })();
    console.log("DATABASE CONNECTED!");
    console.log(`%s listening at ${portServer}`);
  });
});
