const lb = process.argv.slice(2);

if (lb.includes('--mode=lb')) {
  import('./claster');
} else {
  import('./default');
}
