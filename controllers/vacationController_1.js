"use strict";

const Vacation = require("../models/vacation"),
httpStatus = require("http-status-codes"),
User = require("../models/user"),
getVacationParams = body => {
  return {
    title: body.title,
    description: body.description,
    heroImage: body.heroImage,
    cuisine: body.cuisine,
    cost: body.cost,
    maxTravelers: body.maxTravelers,
    destination: body.destination,
    departureLocation: body.departureLocation,
    departureDate: body.departureDate,
    returnDate: body.returnDate
    
  };
};


module.exports = {
    index: (req, res, next) => {
        Vacation.find()
          .then(vacations => {
            res.locals.vacations = vacations;
            next();
          })
          .catch(error => {
            console.log(`Error fetching vacations: ${error.message}`);
            next(error);
          });
    },

    indexView: (req, res) => {
        res.render("vacations/index");
    },

    new: (req, res) => {
        res.render("vacations/new");
      },

    create: (req, res, next) => {
    let vacationParams = getVacationParams(req.body);
    Vacation.create(vacationParams)
      .then(vacation => {
        res.locals.redirect = "/vacations";
        res.locals.vacation = vacation;
        next();
      })
      .catch(error => {
        console.log(`Error saving vacation: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let vacationId = req.params.id;
    Vacation.findById(vacationId )
      .then(vacation => {
        res.locals.vacation = vacation;
        next();
      })
      .catch(error => {
        console.log(`Error fetching vacation by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("vacations/show");
  },

  edit: (req, res, next) => {
    let vacationId = req.params.id;
    Vacation.findById(vacationId)
      .then(vacation => {
        res.render("vacations/edit", {
            vacation: vacation
        });
      })
      .catch(error => {
        console.log(`Error fetching vacation by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let vacationId = req.params.id,
    vacationParams = getVacationParams(req.body);

    Vacation.findByIdAndUpdate(vacationId, {
      $set: vacationParams
    })
      .then(vacation => {
        res.locals.redirect = `/vacations/${vacationId}`;
        res.locals.vacation = vacation;
        next();
      })
      .catch(error => {
        console.log(`Error updating vacation by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let vacationId = req.params.id;
    Vacation.findByIdAndRemove(vacationId)
      .then(() => {
        res.locals.redirect = "/vacations";
        next();
      })
      .catch(error => {
        console.log(`Error deleting vacation by ID: ${error.message}`);
        next();
      });
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },

  filterUserVacations: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedVacations = res.locals.vacations.map(vacation => {
        let userJoined = currentUser.vacations.some(userVacation => {
          return userVacation.equals(vacation._id);
        });
        return Object.assign(vacation.toObject(), { joined: userJoined });
      });
      res.locals.vacations = mappedVacations;
      next();
    } else {
      next();
    }
  },

  join: (req, res, next) => {
    let vacationId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
            vacations: vacationId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  }

};


