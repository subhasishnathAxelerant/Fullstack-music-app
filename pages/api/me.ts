import { validateRoute } from "../../lib/auth";

export default validateRoute((req, res, user)=>{
    // Sends a JSON response
    res.json(user);
})