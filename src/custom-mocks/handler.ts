const handler = {
  test: async <T>(body: T) => {
    console.log('Request received with Body', body);
    return { test_key: 'test_value' };
  },
  test2: async <T>(query: T) => {
    console.log('Request received with query', query);
    return { test_key_2: 'test_value_2' };
  },
};

export default handler;
