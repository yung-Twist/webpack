import './iconfont/iconfont.css';
import './less/index.less';
import print from './print';

console.log(1232);
print();
if (module.hot) {
	module.hot.accept('./print.js', () => {
		print();
	});
}
