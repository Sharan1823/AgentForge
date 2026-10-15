const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkRecentRuns() {
  try {
    const runs = await prisma.agentRun.findMany({
      orderBy: { startedAt: 'desc' },
      take: 3,
      include: { agent: true }
    });
    
    console.log('Recent runs:');
    runs.forEach((run, index) => {
      console.log(`\n${index + 1}. Run ID: ${run.id}`);
      console.log(`   Agent: ${run.agent?.name} (${run.agent?.department})`);
      console.log(`   Status: ${run.status}`);
      console.log(`   Started: ${run.startedAt}`);
      console.log(`   Logs count: ${Array.isArray(run.logs) ? run.logs.length : 'Not an array'}`);
      
      if (Array.isArray(run.logs)) {
        console.log('   Recent logs:');
        run.logs.slice(-3).forEach((log, i) => {
          console.log(`     ${i + 1}. ${log.message || 'No message'}`);
          if (log.data?.downloadUrl) {
            console.log(`        📥 DOWNLOAD URL: ${log.data.downloadUrl}`);
          }
          if (log.data?.type) {
            console.log(`        📋 TYPE: ${log.data.type}`);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRecentRuns();
