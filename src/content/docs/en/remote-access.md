---
title: "Remote Access"
section: guide
order: 6
---

      <a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to Docs</a>
      <h1>Remote Access: SSH</h1>
      <p>Linxira OS ships with the OpenSSH server and the <code>linxira-config</code> SSH management tool. This guide shows how to turn your Linxira machine into a remote-accessible server and how to connect to it securely from other devices.</p>

      <div class="note">📌 <code>linxira-config ssh on|off|status|port|key|authorized</code> are all available. <code>ssh on</code> writes <code>PasswordAuthentication yes</code>, enables and starts sshd, and opens port 22 when UFW is active.</div>

      <h2>1. Enable the SSH service</h2>
      <p>First, check the current SSH status:</p>
      <pre><code>linxira-config ssh status</code></pre>
      <p>Example output:</p>
      <pre><code>SSH Status
  Service state:        inactive
  Service startup:      disabled
  Port:                 22
  Root login:           prohibit-password
  Password authentication: yes
  Connect:              ssh user@192.168.1.100 -p 22</code></pre>

      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <p><strong>Enable and start sshd</strong> (equivalent command for the current test build; a future release will unify this into <code>linxira-config ssh on</code>):</p>
          <p><strong>Persistent</strong> (starts at boot):</p>
          <pre><code>sudo linxira-config ssh on</code></pre>
          <p><strong>Temporary</strong> (this boot only — useful for a one-off debugging session):</p>
          <pre><code>sudo systemctl start sshd
# when done
sudo systemctl stop sshd</code></pre>
          <p>Connect from another machine with non-interactive first-contact flags:</p>
          <pre><code>ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=8 user@IP</code></pre>
          <p>Windows 10/11 ships <code>ssh</code>; run the same command in PowerShell. Find the IP with <code>ip -4 addr show</code> or <code>linxira-config ssh status</code>.</p>
          <p>If you use the UFW firewall, allow the SSH port:</p>
          <pre><code>sudo ufw allow ssh   # or a specific port: sudo ufw allow 22/tcp</code></pre>
        </div>
      </div>

      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <p><strong>Verify the status</strong>:</p>
          <pre><code>linxira-config ssh status
# Service state: active  → success</code></pre>
        </div>
      </div>

      <h2>2. Generate a key pair (on the client)</h2>
      <p>On the <strong>client</strong> (the machine you will connect <em>from</em>), generate an Ed25519 key pair — more secure than password login:</p>
      <pre><code>linxira-config ssh key generate
# or with a name: linxira-config ssh key generate work-laptop</code></pre>
      <p>Inspect the key afterwards:</p>
      <pre><code>linxira-config ssh key list              # list all keys
linxira-config ssh key show              # show the default public key
linxira-config ssh key fingerprint       # show the default key fingerprint</code></pre>

      <h2>3. Authorize the key (on the server)</h2>
      <p>On the <strong>server</strong> (your Linxira machine), add your public key to <code>authorized_keys</code>:</p>

      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <p><strong>Get the public key</strong>: run <code>linxira-config ssh key show</code> on the client and copy the whole line (<code>ssh-ed25519 AAAA... linxira@hostname</code>).</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <p><strong>Save it to a temp file</strong> and authorize it on the server (<code>authorized add</code> accepts only plain public keys — optioned entries are rejected to prevent shell execution paths):</p>
          <pre><code># On the server, paste the key into a file
echo 'ssh-ed25519 AAAA... linxira@hostname' > /tmp/mykey.pub
linxira-config ssh authorized add /tmp/mykey.pub
rm /tmp/mykey.pub</code></pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <p><strong>List authorized keys</strong>:</p>
          <pre><code>linxira-config ssh authorized list</code></pre>
        </div>
      </div>

      <div class="note">💡 Quick path: if both machines run linxira-config, you can copy the key string and transfer it via USB stick or a trusted secure channel, then <code>echo ... > /tmp/mykey.pub</code> and run <code>authorized add</code>. Always make sure the transfer channel is trusted.</div>

      <h2>4. Connect from the client</h2>
      <p>From the client, connect to the server (IP is shown in the <code>Connect:</code> line of <code>linxira-config ssh status</code>):</p>
      <pre><code>ssh username@server-ip
# example: ssh alice@192.168.1.100
# custom port: ssh -p 2222 alice@192.168.1.100</code></pre>
      <p>The first connection prompts you to confirm the host fingerprint — type <code>yes</code>.</p>

      <h3>LAN vs. public scenarios</h3>
      <ul>
        <li><strong>Same LAN</strong>: use the private IP directly, no extra setup.</li>
        <li><strong>Across networks / public</strong>: set up port forwarding on your router, or use Tailscale / ZeroTier instead of exposing port 22.</li>
        <li><strong>Hostname</strong>: within a LAN you can also use <code>ssh user@hostname.local</code> (requires mDNS).</li>
      </ul>

      <h2>5. Hardening recommendations</h2>
      <p>Before exposing your machine as a public server:</p>
      <ul>
        <li><strong>Disable password login</strong>: edit <code>/etc/ssh/sshd_config</code>, set <code>PasswordAuthentication no</code>, then <code>sudo systemctl restart sshd</code>.</li>
        <li><strong>Block root login</strong>: the default <code>PermitRootLogin prohibit-password</code> is already safe; change it to <code>no</code> to fully disable.</li>
        <li><strong>Enable UFW</strong>: <code>sudo ufw enable</code> and allow only the ports you need.</li>
        <li><strong>Install fail2ban</strong> (optional): <code>sudo pacman -S fail2ban</code> to block brute force.</li>
        <li><strong>Change the default port</strong> (optional): edit the <code>Port</code> line in <code>/etc/ssh/sshd_config</code> to reduce scanner noise.</li>
      </ul>

      <div class="warn">⚠️ Before exposing to the public internet, make sure key authentication is enabled and password login is disabled. Linxira's <code>ssh authorized add</code> intentionally accepts only plain keys without options — it never writes <code>command=</code> or <code>environment=</code> entries into <code>authorized_keys</code>.</div>

      <h2>6. Disable and remove</h2>
      <pre><code># Stop SSH (equivalent for the current test build; future: linxira-config ssh off)
sudo systemctl disable --now sshd

# Remove an authorized key (get the fingerprint from authorized list first)
linxira-config ssh authorized list
linxira-config ssh authorized remove SHA256:xxxx --yes

# Delete a local key pair
linxira-config ssh key remove work-laptop --yes</code></pre>

      <h2>Command reference</h2>
      <table>
        <tr><th>Command</th><th>Purpose</th></tr>
        <tr><td><code>linxira-config ssh status</code></td><td>Show service state, port, connect info</td></tr>
        <tr><td><code>linxira-config ssh key generate [name]</code></td><td>Generate an Ed25519 key pair</td></tr>
        <tr><td><code>linxira-config ssh key list</code></td><td>List local public keys</td></tr>
        <tr><td><code>linxira-config ssh key show [name]</code></td><td>Show a public key</td></tr>
        <tr><td><code>linxira-config ssh key fingerprint [name]</code></td><td>Show a key fingerprint</td></tr>
        <tr><td><code>linxira-config ssh key remove &lt;name&gt; --yes</code></td><td>Remove a key pair</td></tr>
        <tr><td><code>linxira-config ssh authorized list</code></td><td>List authorized keys</td></tr>
        <tr><td><code>linxira-config ssh authorized add &lt;pubkey-file&gt;</code></td><td>Authorize one plain public key</td></tr>
        <tr><td><code>linxira-config ssh authorized remove &lt;fp&gt; --yes</code></td><td>Remove an authorization by fingerprint</td></tr>
      </table>

      <p>More configuration and diagnostics (mirrors, network, security) are covered in the <a href="/en/docs/config-hub/">Config Hub docs</a>.</p>
