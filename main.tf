variable "AWS_ACCESS_KEY" {
  type = string
}

variable "AWS_SECRET_KEY" {
  type = string
}
provider "aws" {
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
  region     = "us-east-1"
}

# -----------------------------
# Jenkins EC2 Instance
# -----------------------------
resource "aws_instance" "jenkins_server" {
  ami             = "ami-09fdd0b7882a4ec7b"
  instance_type   = "t4g.medium"
  key_name        = "my-dev-server-key"
  security_groups = [aws_security_group.jenkins_sg.name, aws_security_group.mysql_sg.name]

  user_data = <<-EOF
  #!/bin/bash
  sudo apt update -y

  # Install Python 3.12
  sudo add-apt-repository -y ppa:deadsnakes/ppa
  sudo apt update -y
  sudo apt install -y python3.12 python3.12-venv python3.12-dev

  # Set Python 3.12 as the default version
  sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1
  sudo update-alternatives --config python3 <<< "1"

  # Verify installation
  python3 --version
  EOF

  tags = {
    Name = "Server"
  }
}

# -----------------------------
# Jenkins Security Group
# -----------------------------
resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins-security-group"
  description = "Allow SSH and Jenkins traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Change to your IP for security
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Change to your IP if needed
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# -----------------------------
# Output Public IP of Jenkins Instance
# -----------------------------
output "jenkins_public_ip" {
  value = aws_instance.jenkins_server.public_ip
  description = "The public IP address of the Jenkins EC2 instance"
}