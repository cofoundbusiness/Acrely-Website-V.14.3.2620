const { execSync } = require('child_process');
try {
  execSync('npx prisma validate', { 
    stdio: 'pipe', 
    encoding: 'utf-8', 
    env: { ...process.env, process: { stdout: { columns: 200 } }, FORCE_COLOR: '0', COLUMNS: '200' }
  });
  console.log('Valid');
} catch (e) {
  console.error("====== ERROR START ======");
  console.error(e.stderr);
  console.error("====== STDOUT ======");
  console.error(e.stdout);
}
