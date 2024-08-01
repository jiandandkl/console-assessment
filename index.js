/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

/**
 * 排除私有属性
 * @param {*} propertiesList 私有属性list
 * @param {*} objList 对象list
 * @returns
 */
exports.stripPrivateProperties = (propertiesList, objList) => {
  return objList.map((obj) => {
    const filteredObject = {};
    for (let key in obj) {
      if (!propertiesList.includes(key)) {
        filteredObject[key] = obj[key];
      }
    }
    return filteredObject;
  });
};

/**
 * 删除对象中包含指定属性的对象
 * @param {*} property 指定属性
 * @param {*} objList 对象list
 * @returns
 */
exports.excludeByProperty = (property, objList) => {
  return objList.filter((obj) => !(property in obj));
};

/**
 * 嵌套对象求和
 * @param {*} objList 对象list
 * @returns
 */
exports.sumDeep = (objList) => {
  return objList.map((item) => {
    const sum = item.objects.reduce((acc, curr) => acc + curr.val, 0);
    return { objects: sum };
  });
};

/**
 * 给状态匹配颜色
 * @param {*} colorCodesMap 颜色对应的状态码
 * @param {*} statuses  状态数组
 * @returns
 */
exports.applyStatusColor = (colorCodesMap, statuses) => {
  const statusToColor = {};
  for (const color in colorCodesMap) {
    colorCodesMap[color].forEach((code) => {
      statusToColor[code] = color;
    });
  }

  return statuses
    .filter((statusObj) => statusToColor.hasOwnProperty(statusObj.status))
    .map((statusObj) => ({
      ...statusObj,
      color: statusToColor[statusObj.status],
    }));
};

/**
 * 创建greeting
 * @param {*} greetFunc 打招呼函数
 * @param {*} greetingText 打招呼文本
 * @returns
 */
exports.createGreeting = (greetFunc, greetingText) => {
  return function (name) {
    return greetFunc(greetingText, name);
  };
};

/**
 * 设置默认值
 * @param {*} defaultProps 默认值
 * @returns
 */
exports.setDefaults = (defaultProps) => {
  return function (obj) {
    const newObj = { ...obj };

    for (let prop in defaultProps) {
      if (!(prop in newObj)) {
        newObj[prop] = defaultProps[prop];
      }
    }

    return newObj;
  };
};

/**
 * 获取用户信息
 * @param {*} name 用户名
 * @param {*} services 服务
 * @returns
 */
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  const [userList, status] = await Promise.all([
    services.fetchUsers(name),
    services.fetchStatus(),
  ]);

  const user = userList.find((u) => u.name === name);
  if (!user) {
    throw new Error('User not found');
  }

  const company = await services.fetchCompanyById(user.companyId);
  return {
    company,
    status,
    user,
  };
};
