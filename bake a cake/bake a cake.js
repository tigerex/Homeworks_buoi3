const readline = require("readline");

let name;
let age;
let sizePrice = [169000, 233000, 510000];
let chosenCakeSize;
let chosenCakePrice;
let moneyGotten;

function wait(second) {
  let waitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
  return waitPromise;
}

function getInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

async function inputInfor() {
  console.log("Thông tin người nhận bánh:");
  name = await getInput("Tên: ? ");
  age = parseInt(await getInput("Tuổi: ? "));

  if (name != "" && age > 0) {
    console.log("Thành công \n");
  } else {
    console.log("Thất bại \n");
    process.exit(1);
  }
}

async function negotiation() {
  console.log("Xin tiền mẹ mua bánh: ");
  moneyGotten = parseInt(await getInput("Số tiền: ? "));

  if (moneyGotten >= 0) {
    console.log("xin thành công số tiền: " + moneyGotten + "\n");
    if (moneyGotten > sizePrice[2]) {
      chosenCakeSize = "L";
      chosenCakePrice = sizePrice[2];
      console.log(
        "Thương lượng thành công xúc xích, có thể chọn size: " + chosenCakeSize + "\n"
      );
    } else if (moneyGotten > sizePrice[1]) {
      chosenCakeSize = "M";
      chosenCakePrice = sizePrice[1];
      console.log("Thương lượng thành công, có thể chọn size: " + chosenCakeSize + "\n");
    } else if (moneyGotten > sizePrice[0]) {
      chosenCakeSize = "S";
      chosenCakePrice = sizePrice[0];
      console.log("Thương lượng cũng thành công, có thể chọn size: " + chosenCakeSize + "\n");
    } else {
      console.log("Kèo này hỏng rồi!!!!!! \n");
      console.log("Sủiiiiiiiiiiii");
      process.exit(1);
    }
  } else {
    console.log("Thất bại \n");
    console.log("Sủiiiiiiiiiiii");
    process.exit(1);
  }
}


async function doGrocery() {
    console.log("Đi nào, tầm này thì chắc 10 phút là xong");
    await wait(10);
    for(let i = 0; i < wait(10); i++){
        process.stdout.write("Còn"+parseInt(4-i)+"s nữa thôi\n");
    }
    console.log("Ok, đã xong, giờ thêm 2 phút để về");
    await wait(2);
    for(let i = 0; i < wait(2); i++){
        process.stdout.write("Còn"+parseInt(4-i)+"s nữa thôi\n");
    }
    console.log("Về nhà rồi nè mẹ!!!!!!!!!!");

  }

async function cook() {
    async function prepare() {
        return new Promise(async (resolve, reject) => {
            console.log("Sơ chế nguyên liệu.\n==================");
            console.log("\n1.Tách trứng.\n2.Ray bột.\n3.Chuẩn bị gia vị.");
            await wait(4);
            for(let i = 0; i < wait(4); i++){
                process.stdout.write("Còn"+parseInt(4-i)+"s nữa thôi\n");
            }
            console.log("Vậy là chuẩn bị xong!!!!\n");
            resolve();
        });
    }

    async function cakeFoundation() {
        return new Promise(async (resolve, reject) => {
            console.log("Làm bột bánh.");
            await wait(5);
            console.log("Đánh kem.");
            await wait(5);
            console.log("OK! Giờ nướng bánh.\n");
            resolve();
        });
    }

    async function bake() {
        return new Promise(async (resolve, reject) => {
          console.log("Ủ bánh");
          await wait(5);
          console.log("Đổ khuôn");
          await wait(5);
          console.log("Nướng bánh");
          await wait(5);
          console.log("Trang trí nữa thôi là xong\n");
          resolve();
        });
    }

    await prepare();
    await cakeFoundation();
    await bake();

}

async function decorate() {
    console.log("Quết kem.");
    await wait(3);
    console.log("Trang trí.");
    await wait(3);
    console.log("Viết tên lên bánh.");
    await wait(3);
    console.log("Và hoàn thành cái bánh!!! \n----------------------------");
  }

async function consume() {
    console.log("Mình không có quất cái bánh được, tại vì nó không có hư. Nên là mình ĂN nó.");
    await wait(1);
    console.log("============================-END-============================");
    let tienThua = moneyGotten - chosenCakePrice;
    console.log("Nãy mẹ cho: ",moneyGotten);
    console.log("Mà cái bánh thì có: ",chosenCakePrice);
    console.log(`Vậy trả mẹ tiền thừa: ${tienThua}`);
}


async function main() {
    await inputInfor()
    .then(async (value) => {
      console.log(value);
      await negotiation()
        .then(async (value) => {
        console.log(value);
        console.log(
            `============================\n
            Giờ mình làm bánh cho: ${name}, 
            nhân dịp sinh nhật ${age} tuổi của bản. 
            Mình chọn hẳn cái bánh size ${chosenCakeSize}, 
            thiệt hại ${chosenCakePrice} đồng
            \n============================`
          );

      })
      .catch((value) => {
        console.log(value);
        console.log("Nghèo");
        rl.close();
      });
      await doGrocery();
      await cook();
      await decorate();
      await consume();
    })
    .catch((value) => {
      console.log(value);
    });
    
  };
  
  main();