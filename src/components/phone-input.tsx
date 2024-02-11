import React, { useState } from 'react';
import InputMask, { Props } from 'react-input-mask';

export default function PhoneInput(props: Omit<Props, "mask">) {
    const [mask, setMask] = useState("(99) 99999-9999");

    return <InputMask
        {...props}
        type="tel"
        mask={mask}
        onBlur={e => {
            if (e.target.value.replace("_", "").length === 14) {
                setMask("(99) 9999-9999");
            }
        }}
        onFocus={e => {
            if (e.target.value.replace("_", "").length === 14) {
                setMask("(99) 99999-9999");
            }
        }}
    />
};