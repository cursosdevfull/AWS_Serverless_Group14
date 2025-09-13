import { InvokeCommand, InvokeCommandInput, Lambda, LambdaClient } from "@aws-sdk/client-lambda"

const client = new LambdaClient()

enum CountryISO {
    PE = "PE",
    CO = "CO",
    MX = "MX"
}

interface CreateAppointmentParams {
    patientId: string;
    slotId: string;
    countryISO: CountryISO;
}

export const create = async (event: CreateAppointmentParams) => {
    const { patientId, slotId, countryISO } = event

    const input: InvokeCommandInput = {
        FunctionName: `appointment-dev-appointment-${countryISO.toLowerCase()}`,
        Payload: JSON.stringify({ patientId, slotId }),
        InvocationType: "RequestResponse"
    }

    const command = new InvokeCommand(input)

    const response = await client.send(command)

    console.log(`Create appointment ${countryISO} handler invoked with event:`, event);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Appointment created successfully in ${countryISO}`,
            response
        })
    }
}