import { NextFunction, Request, Response } from 'express';



const validate = (schema) => {
  
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({

      });
      return next();
    } catch (err) {
      return res.status(500).json({type: err.name, message: err.message})
    }
  }
  
}