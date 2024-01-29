import React from "react";

type FaxMailProps = {
  name: string;
}

export const FaxMailComponent =(props: FaxMailProps) => {
        const {name} = props;

        return (
            <>
                {name}
            </>
        )
}