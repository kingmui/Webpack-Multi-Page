export const judgeEnv = () => {
  const UA = window.navigator.userAgent;
  return {
    ios: /(iPhone|iPad|iPod|iOS)/i.test(UA),
    android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1 || UA.indexOf('Linux') > -1,
  };
};
