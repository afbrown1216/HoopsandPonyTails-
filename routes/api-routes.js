  const axios = require("axios");
  const express = require("express");
  const app = express.Router();
  const db = require("../models");
  

var count = 0;



  module.exports = function (app) {

    // //======================================================================================
    //     // GET route for getting all of the users
    app.get("/api/user/", function (req, res) {
      db.User.findAll({
        where:{
          loggedin: true
        }
      })
        .then(function (dbUserGet) {
          res.json(dbUserGet);
        });
    });

    // GET route for getting all of the teams
    app.get("/api/team/", function (req, res) {
      db.Team.findAll()
        .then(function (dbTeamGet) {
          res.json(dbTeamGet);
        });
    });

    // GET route for getting all of the players
    app.get("/api/player/", function (req, res) {
      db.Player.findAll()
        .then(function (dbPlayerGet) {
          res.json(dbPlayerGet);
        });
    });
    app.get("/api/player/:team_id", function (req, res) {
      db.Player.findAll({
        where:{team_name: req.params.team_id}
      })
        .then(function (teamPlayer) {
          res.json(teamPlayer);
        });
    });

    // //======================================================================================
    // Get route for retrieving a single user
    app.get("/api/users/:username", function (req, res) {
      db.User.findAll({
        attributes: ['username'],
          where: {
            username: req.params.username
          }
        })
        .then(function (dbUserSingle) {
          if(!dbUserSingle === undefined){
            res.send("user not found")
          }else {
            res.send(dbUserSingle);
          }
          console.log(dbUserSingle)
        
        });
    });

    // Get route for retrieving a single team
    app.get("/api/team/:team_id", function (req, res) {
      db.Team.findOne({
          where: {
            id: req.params.team_id
          }
        })
        .then(function (dbTeamSingle) {
          res.json(dbTeamSingle);
        });
    });

    // Get route for retrieving a single player
    app.get("/api/player/:player_id", function (req, res) {
      db.Player.findOne({
          where: {
            id: req.params.player_id
          }
        })
        .then(function (dbPlayerSingle) {
          res.json(dbPlayerSingle);
        });
    });




    //   //===Delete Routes===================================================================================

    // DELETE route for deleting users
    app.delete("/api/user/:user_id", function (req, res) {
      db.User.destroy({
          where: {
            id: req.params.user_id
          }
        })
        .then(function (dbUserDelete) {
          res.json(dbUserDelete);
        });
    });

    // DELETE route for deleting teams
    app.delete("/api/team/:team_id", function (req, res) {
      db.Team.destroy({
          where: {
            id: req.params.team_id
          }
        })
        .then(function (dbTeamDelete) {
          res.json(dbTeamDelete);
        });
    });
    // DELETE route for deleting players
    app.delete("/api/player/:player_id", function (req, res) {
      db.Player.destroy({
          where: {
            id: req.params.player_id
          }
        })
        .then(function (dbPlayerDelete) {
          res.json(dbPlayerDelete);
        });
    });

    //   //======================================================================================

    // PUT route for updating users
    app.put("/api/user", function (req, res) {
      db.User.update(req.body, {
          where: {
            id: req.body.user_id
          }
        })
        .then(function (dbUserPut) {
          res.json(dbPlayerPut);
        });
    });

    // PUT route for updating teams
    app.put("/api/team", function (req, res) {
      db.Team.update(req.body, {
          where: {
            id: req.body.team_id
          }
        })
        .then(function (dbTeamPut) {
          res.json(dbTeamPut);
        });
    });

    // PUT route for updating players
    app.put("/api/player", function (req, res) {
      db.Player.update(req.body, {
          where: {
            id: req.body.player_id
          }
        })
        .then(function (dbPlayerPut) {
          res.json(dbPlayerPut);
        });
    });

    //Third Party API Calls//======================================================================================
    //add player to team 
    app.post("/teamPlayer", function (req, res) {
      db.Player.create({
        team_id: req.body.player_name, 
        player_name:req.body.player_name
      }).then(function (player){
        res.json(player);
      })
      
    })


    app.put("/api/user/:username", function (req, res) {
      db.User.update(
        req.body , 
        {where: {username: req.body.username
        }})
      .then(function (dbUserPut) {
        res.json(dbUserPut);
      });
    });
  

  }