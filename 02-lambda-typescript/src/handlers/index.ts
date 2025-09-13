export const register = async (event: any) => {
  console.log('Register handler invoked with event:', event.body);
  const { name, lastname } = JSON.parse(event.body);

  console.log(`Register handler invoked with name: ${name} and lastname: ${lastname}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User registered successfully' }),
  }
}