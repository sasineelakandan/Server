import { promises } from 'dns'
import { AddUserInput, AddUserOuput, GetUserOutput } from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
}