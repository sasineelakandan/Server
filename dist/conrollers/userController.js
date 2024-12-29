import OtpService from "../midlewere/otpservice/user/saveOtp";
export class UserController {
    constructor(userService) {
        this.userSignup = async (httpRequest) => {
            try {
                const { username, email, phone, password } = httpRequest.body;
                const user = await this.userService.userSignup({
                    username,
                    email,
                    phone,
                    password,
                });
                const { accessToken, refreshToken } = user;
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = user._id.toString();
                const useremail = email;
                await this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user, accessToken, refreshToken },
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        };
        this.verifyOtp = async (httpRequest) => {
            try {
                const { userId, otp } = httpRequest.body;
                console.log(userId);
                const savedOtp = await this.userService.verifyOtp({ userId, otp });
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...savedOtp },
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        };
        this.resendOtp = async (httpRequest) => {
            try {
                console.log(httpRequest);
                const { userId } = httpRequest.body;
                await this.otpService.resendOtp(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { message: 'resendOtp successfull' },
                };
            }
            catch (error) {
                console.log("Error in resend otp", error.message);
                throw new Error(error.message);
            }
        };
        this.userLogin = async (httpRequest) => {
            try {
                const { email, password } = httpRequest.body;
                const user = await this.userService.userLogin(email, password);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user },
                };
            }
            catch (e) {
                console.log(e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message,
                    },
                };
            }
        };
        this.userProfile = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = await this.userService.userProfile(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user },
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.changeProfile = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { name, phone } = httpRequest.body;
                console.log(name, phone);
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = await this.userService.changeProfile(userId, name, phone);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user },
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.changePassword = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { oldPassword, newPassword } = httpRequest?.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = await this.userService.changePassword(userId, oldPassword, newPassword);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user },
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.getAppointments = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = await this.userService.getAppointments(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.cancelAppointments = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { appointmentId } = httpRequest?.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = await this.userService.cancelAppointments(userId, appointmentId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.updateProfilepic = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const uploadedUrl = httpRequest?.body?.uploadedUrl;
                console.log(uploadedUrl);
                if (!uploadedUrl) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = await this.userService.updateProfilePic(userId, uploadedUrl);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201, // Created
                    body: { message: "Profile picture updated successfully.", data: updatedProfile },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.chatwithDoctor = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { apptId } = httpRequest?.body;
                if (!apptId) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = await this.userService.chatwithDoctor(userId, apptId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201, // Created
                    body: { message: "Profile picture updated successfully.", data: updatedProfile },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.sendMessage = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { activeUser, message } = httpRequest?.body;
                if (!activeUser) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const createmessage = await this.userService.sendMessage(activeUser, message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { message: "Msg send  successfully.", data: createmessage },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500;
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.getMessages = async (httpRequest) => {
            try {
                const roomId = httpRequest?.query?.roomId;
                if (!roomId || typeof roomId !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('Room ID is required and must be a string.');
                }
                const messages = await this.userService.getMessage(roomId);
                console.log(messages);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: messages,
                };
            }
            catch (error) {
                console.error('Error in getMessages:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.getChatMembers = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId || typeof userId !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('Room ID is required and must be a string.');
                }
                const messages = await this.userService.getChatMembers(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: messages,
                };
            }
            catch (error) {
                console.error('Error in getMessages:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.slotAssign = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const slotData = httpRequest?.body;
                console.log(slotData);
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = await this.userService.slotAsign(userId, slotData);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user },
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.getcompleteAppointment = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointments = await this.userService.getcompleteAppointment(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointments
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.userReview = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const review = httpRequest?.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointments = await this.userService.userReview(userId, review);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointments
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.googleLogin = async (httpRequest) => {
            try {
                const { displayName, email, photoURL } = httpRequest.body;
                const user = await this.userService.googleLogin({
                    displayName,
                    email,
                    photoURL
                });
                const { accessToken, refreshToken } = user;
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = user._id.toString();
                const useremail = email;
                await this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { ...user, accessToken, refreshToken },
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        };
        this.getReview = async (httpRequest) => {
            try {
                const doctorId = httpRequest?.query?.doctorId;
                if (typeof doctorId !== 'string') {
                    throw new Error('doctorId must be a valid string.');
                }
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const reviewDatas = await this.userService.getReview(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: reviewDatas
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        };
        this.userService = userService;
        this.otpService = new OtpService();
    }
}
