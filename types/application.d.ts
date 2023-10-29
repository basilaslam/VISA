import { IApplication } from "@/models/application.model"
import { IUser } from "@/models/user.model";


  export interface ApplicationApiResponse {
          data: IApplication[],
      status: string
} 
  export interface PopulatedApplicationApiResponse {
          data: PopulatedApplication[],
      status: string
} 
  export interface SingleApplicationApiResponse {
    data: IApplication,
    status: string
} 



export interface PopulatedApplication extends Document {
  _id: string
  originalName: string;
  uploadedBy: IUser;
  fullname: string;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  pdf: string;
  status: string;
  uploadedAt: Date;
  // Add more fields here if needed
}