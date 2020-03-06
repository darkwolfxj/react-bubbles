import { useState } from "react";

export default function useForm(initialValue) {
    const [value, setValue] = useState(initialValue)
    const handleChanges = updatedValue => setValue(updatedValue)
    return [value, handleChanges]
}
