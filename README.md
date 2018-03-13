将设如下一个DOM

    <div>一个两个三个个七个八个212332311省略省略</div>

- 首先dom.cloneNode(true) 克隆得到cloneDOM，之后的任何操作都在cloneDOM上操作
- cloneDOM加上visibility、overflow、position:absolute、 z-index让其不显示
- 具体思路就是每次减少内容块一个字符，判断 cloneDOM 的高度是否符合要求



当然也不能每次都是一个字符一个字符的减少，这样性能较差，

所以假设原来5行，要减少到2行，则第一次一次性减少至3行，然后后面再一个字符一个字符的减少






